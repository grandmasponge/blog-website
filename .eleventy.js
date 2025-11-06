import path from "node:path";
import * as sass from "sass";

export default function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/static/images") 
  eleventyConfig.addWatchTarget('./src/js/');

  eleventyConfig.addTemplateFormats("scss")

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByTag("post");
  });

  eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",

        compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);

			let result = sass.compileString(inputContent, {
                style: "expanded",
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

		
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
        }
  })
  
  return {
    templateFormats: ["njk", "md", "html"],
     dir: {
        input: 'src',
        output: 'target'
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"   
  };
};