import yaml from 'js-yaml';
import type { ShowContent, GroupContent, DatesContent, ImageAsset } from '../types';

// Load all content and images eagerly
const markdownFiles = import.meta.glob('../content/*/*.md', { query: '?raw', import: 'default', eager: true });
const heroImages = import.meta.glob('../assets/images/*/hero/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
const galleryImages = import.meta.glob('../assets/images/*/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
const businessImages = import.meta.glob('../assets/images/*/business/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
const audienceImages = import.meta.glob('../assets/images/audience/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });

export const parseMarkdown = <T>(markdown: string): T & { body: string } => {
  const parts = markdown.split('---\n');
  if (parts.length < 3) {
    return { body: markdown } as T & { body: string };
  }
  
  const frontmatter = parts[1];
  const body = parts.slice(2).join('---\n').trim();
  
  const data = yaml.load(frontmatter) as T;
  return { ...data, body };
};

const getMarkdownFile = (playId: string, filename: string): string => {
  const path = `../content/${playId}/${filename}.md`;
  const content = markdownFiles[path];
  if (!content) {
    console.warn(`Markdown file not found: ${path}`);
    return '';
  }
  return content as string;
};

export const getShowContent = (playId: string): ShowContent => {
  const markdown = getMarkdownFile(playId, 'show');
  return parseMarkdown<Omit<ShowContent, 'body'>>(markdown);
};

export const getGroupContent = (playId: string): GroupContent => {
  const markdown = getMarkdownFile(playId, 'groups');
  const content = parseMarkdown<Omit<GroupContent, 'body'>>(markdown);
  
  // Logic to get the business image for this play
  const imagePath = Object.keys(businessImages).find(path => path.includes(`/images/${playId}/business/`));
  const imageSrc = imagePath ? (businessImages[imagePath] as { default: string }).default : undefined;

  return { ...content, image: imageSrc };
};

export const getDatesContent = (playId: string): DatesContent => {
  const markdown = getMarkdownFile(playId, 'dates');
  return parseMarkdown<Omit<DatesContent, 'body'>>(markdown);
};

export const getHeroImage = (playId: string): string => {
  const imagePath = Object.keys(heroImages).find(path => path.includes(`/images/${playId}/hero/`));
  return imagePath ? (heroImages[imagePath] as { default: string }).default : '';
};

export const getGalleryImages = (playId: string): ImageAsset[] => {
  return Object.keys(galleryImages)
    .filter(path => path.includes(`/images/${playId}/gallery/`))
    .sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((path) => ({
      src: (galleryImages[path] as { default: string }).default,
      alt: path.split('/').pop()?.split('.')[0] || 'Gallery image',
    }));
};

export const getAudienceImages = (): ImageAsset[] => {
  return Object.keys(audienceImages)
    .sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((path) => ({
      src: (audienceImages[path] as { default: string }).default,
      alt: path.split('/').pop()?.split('.')[0] || 'Audience image',
    }));
};
