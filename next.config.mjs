import withMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

import remarkGfm from "remark-gfm";

/** @type {string} */
const i18nPath = "./src/lang/request.ts";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx", "jsx", "js"],
  productionBrowserSourceMaps: true,
};

/** @type {import("@next/mdx").NextMDXOptions} */
const mdxConfig = {
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
};

export default createNextIntlPlugin(i18nPath)(withMDX(mdxConfig)(nextConfig));
