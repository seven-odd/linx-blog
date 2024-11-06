declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "about";
  data: InferEntrySchema<"about">
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "about";
  data: InferEntrySchema<"about">
} & { render(): Render[".md"] };
};
"authors": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"english/john-doe.md": {
	id: "english/john-doe.md";
  slug: "english/john-doe";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"english/sam-wilson.md": {
	id: "english/sam-wilson.md";
  slug: "english/sam-wilson";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"english/william-jacob.md": {
	id: "english/william-jacob.md";
  slug: "english/william-jacob";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/john-doe.md": {
	id: "french/john-doe.md";
  slug: "french/john-doe";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/sam-wilson.md": {
	id: "french/sam-wilson.md";
  slug: "french/sam-wilson";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
"french/william-jacob.md": {
	id: "french/william-jacob.md";
  slug: "french/william-jacob";
  body: string;
  collection: "authors";
  data: InferEntrySchema<"authors">
} & { render(): Render[".md"] };
};
"blog": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-1.md": {
	id: "english/post-1.md";
  slug: "english/post-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-2.md": {
	id: "english/post-2.md";
  slug: "english/post-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-3.md": {
	id: "english/post-3.md";
  slug: "english/post-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"english/post-4.md": {
	id: "english/post-4.md";
  slug: "english/post-4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-1.md": {
	id: "french/post-1.md";
  slug: "french/post-1";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-2.md": {
	id: "french/post-2.md";
  slug: "french/post-2";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-3.md": {
	id: "french/post-3.md";
  slug: "french/post-3";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"french/post-4.md": {
	id: "french/post-4.md";
  slug: "french/post-4";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"callToAction": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "callToAction";
  data: any;
  render(): Render[".md"];
}>;
"contact": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "contact";
  data: InferEntrySchema<"contact">
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "contact";
  data: InferEntrySchema<"contact">
} & { render(): Render[".md"] };
};
"content": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "content";
  data: InferEntrySchema<"content">;
  render(): Render[".md"];
}>;
"homepage": {
"english/-index.md": {
	id: "english/-index.md";
  slug: "english/-index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".md"] };
"french/-index.md": {
	id: "french/-index.md";
  slug: "french/-index";
  body: string;
  collection: "homepage";
  data: any
} & { render(): Render[".md"] };
};
"pages": {
"english/elements.mdx": {
	id: "english/elements.mdx";
  slug: "english/elements";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"english/privacy-policy.md": {
	id: "english/privacy-policy.md";
  slug: "english/privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
"french/elements.mdx": {
	id: "french/elements.mdx";
  slug: "french/elements";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".mdx"] };
"french/privacy-policy.md": {
	id: "french/privacy-policy.md";
  slug: "french/privacy-policy";
  body: string;
  collection: "pages";
  data: InferEntrySchema<"pages">
} & { render(): Render[".md"] };
};
"sections": {
"english/call-to-action.md": {
	id: "english/call-to-action.md";
  slug: "english/call-to-action";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"english/testimonial.md": {
	id: "english/testimonial.md";
  slug: "english/testimonial";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"french/call-to-action.md": {
	id: "french/call-to-action.md";
  slug: "french/call-to-action";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
"french/testimonial.md": {
	id: "french/testimonial.md";
  slug: "french/testimonial";
  body: string;
  collection: "sections";
  data: any
} & { render(): Render[".md"] };
};
"testimonials": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "testimonials";
  data: any;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
