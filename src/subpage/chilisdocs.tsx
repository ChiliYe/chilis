/** @format */

import {
	createElement,
	useEffect,
	useState,
	type ComponentProps,
} from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import "./chilisdocs.scss";

interface DocumentHeading {
	id: string;
	title: string;
	level: number;
	line: number;
	children: DocumentHeading[];
}

const markdownLoaders = import.meta.glob<string>("./*.md", {
	query: "?raw",
	import: "default",
});

const documents = Object.entries(markdownLoaders).map(([path, load]) => {
	const fileName = path.split("/").pop()?.replace(/\.md$/, "") ?? path;

	return {
		slug: fileName,
		title: fileName
			.replace(/[-_]/g, " ")
			.replace(/\b\w/g, (letter) => letter.toUpperCase()),
		load,
	};
});

function getHeadingText(markdown: string) {
	return markdown
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/`([^`]*)`/g, "$1")
		.replace(/[*_~]/g, "")
		.replace(/<[^>]*>/g, "")
		.trim();
}

function createHeadingIndex(markdown: string) {
	const root: DocumentHeading[] = [];
	const parents: DocumentHeading[] = [];
	const slugCounts = new Map<string, number>();
	let fence: { marker: string; length: number } | undefined;

	markdown.split(/\r?\n/).forEach((line, index) => {
		const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
		if (fenceMatch) {
			const marker = fenceMatch[1][0];
			if (!fence) {
				fence = { marker, length: fenceMatch[1].length };
			} else if (
				fence.marker === marker &&
				fenceMatch[1].length >= fence.length
			) {
				fence = undefined;
			}
			return;
		}
		if (fence) return;

		const match = line.match(/^(#{1,6})[ \t]+(.+?)[ \t]*#*[ \t]*$/);
		if (!match) return;

		const title = getHeadingText(match[2]);
		const baseId =
			title
				.toLocaleLowerCase()
				.replace(/[^\p{L}\p{N}\s-]/gu, "")
				.trim()
				.replace(/\s+/g, "-") || `heading-${index + 1}`;
		const count = slugCounts.get(baseId) ?? 0;
		slugCounts.set(baseId, count + 1);
		const heading: DocumentHeading = {
			id: count === 0 ? baseId : `${baseId}-${count}`,
			title,
			level: match[1].length,
			line: index + 1,
			children: [],
		};

		while (
			parents.length > 0 &&
			parents[parents.length - 1].level >= heading.level
		) {
			parents.pop();
		}
		const parent = parents[parents.length - 1];
		(parent ? parent.children : root).push(heading);
		parents.push(heading);
	});

	return root;
}

function createHeadingComponents(
	headings: DocumentHeading[],
): Components {
	const headingsByLine = new Map<number, string>();
	const addHeadings = (items: DocumentHeading[]) => {
		for (const heading of items) {
			headingsByLine.set(heading.line, heading.id);
			addHeadings(heading.children);
		}
	};
	addHeadings(headings);

	const renderHeading = (tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") =>
		function Heading({
			node,
			...props
		}: ComponentProps<"h1"> & {
			node?: { position?: { start?: { line?: number } } };
		}) {
			const line = node?.position?.start?.line;
			return createElement(
				tag,
				{ ...props, id: line ? headingsByLine.get(line) : undefined },
				props.children,
			);
		};

	return {
		h1: renderHeading("h1"),
		h2: renderHeading("h2"),
		h3: renderHeading("h3"),
		h4: renderHeading("h4"),
		h5: renderHeading("h5"),
		h6: renderHeading("h6"),
	};
}

function HeadingTree({ headings }: { headings: DocumentHeading[] }) {
	if (headings.length === 0) return null;

	return (
		<ul>
			{headings.map((heading) => (
				<HeadingTreeItem key={heading.id} heading={heading} />
			))}
		</ul>
	);
}

function HeadingTreeItem({ heading }: { heading: DocumentHeading }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const hasChildren = heading.children.length > 0;

	return (
		<li>
			<div className="docs-outline-item">
				<a href={`#${heading.id}`}>{heading.title}</a>
				{hasChildren && (
					<button
						type="button"
						className="docs-outline-toggle"
						aria-label={`${isExpanded ? "折叠" : "展开"}${heading.title}`}
						aria-expanded={isExpanded}
						onClick={() => setIsExpanded((expanded) => !expanded)}
					>
						<span aria-hidden="true">
							{isExpanded ? "−" : "+"}
						</span>
					</button>
				)}
			</div>
			{hasChildren && isExpanded && (
				<HeadingTree headings={heading.children} />
			)}
		</li>
	);
}

export default function ChilisDocs() {
	const { docId } = useParams();
	const defaultDocument =
		documents.find((document) => document.slug === "chilisrule") ??
		documents[0];
	const selectedSlug = docId ?? defaultDocument?.slug;
	const selectedDocument = documents.find(
		(document) => document.slug === selectedSlug,
	);
	const [content, setContent] = useState("");
	const [loadError, setLoadError] = useState("");
	const headingIndex = createHeadingIndex(content);
	const headingComponents = createHeadingComponents(headingIndex);

	useEffect(() => {
		let isCurrent = true;
		setContent("");
		setLoadError("");

		if (!selectedDocument) {
			return () => {
				isCurrent = false;
			};
		}

		selectedDocument
			.load()
			.then((markdown) => {
				if (isCurrent) {
					setContent(markdown);
				}
			})
			.catch((error: unknown) => {
				console.error(
					`Unable to load documentation: ${selectedDocument.slug}`,
					error,
				);
				if (isCurrent) {
					setLoadError("文档加载失败，请稍后重试。");
				}
			});

		return () => {
			isCurrent = false;
		};
	}, [selectedDocument]);

	return (
		<section className="docs-page">
			<aside className="docs-sidebar" aria-label="文档列表">
				<h2>文档</h2>
				<nav>
					<ul>
						{documents.map((document) => (
							<li key={document.slug}>
								<Link
									to={`/docs/${document.slug}`}
									aria-current={
										document.slug === selectedSlug
											? "page"
											: undefined
									}
								>
									{document.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				{content && headingIndex.length > 0 && (
					<details className="docs-outline">
						<summary>本页索引</summary>
						<nav aria-label="当前文档索引">
							<HeadingTree headings={headingIndex} />
						</nav>
					</details>
				)}
			</aside>
			<article className="docs-content">
				{!selectedDocument ? (
					<p role="status">找不到指定的文档。</p>
				) : loadError ? (
					<p role="alert">{loadError}</p>
				) : content ? (
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						components={headingComponents}
					>
						{content}
					</ReactMarkdown>
				) : (
					<p role="status">正在加载文档...</p>
				)}
			</article>
		</section>
	);
}