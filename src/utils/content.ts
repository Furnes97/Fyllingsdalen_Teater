import yaml from 'js-yaml';
import type { ShowContent, GroupContent, DatesContent, ImageAsset } from '../types';

// Import markdown files as raw strings
import showMd from '../content/show.md?raw';
import groupsMd from '../content/groups.md?raw';
import datesMd from '../content/dates.md?raw';

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

export const getShowContent = (): ShowContent => {
  return parseMarkdown<Omit<ShowContent, 'body'>>(showMd);
};

export const getGroupContent = (): GroupContent => {
  const content = parseMarkdown<Omit<GroupContent, 'body'>>(groupsMd);
  
  // Logic to get the business image
  const modules = import.meta.glob('../assets/images/business/*.{jpg,jpeg,png,webp}', { eager: true });
  const path = Object.keys(modules)[0];
  const imageSrc = path ? (modules[path] as { default: string }).default : undefined;

  return { ...content, image: imageSrc };
};

export const getDatesContent = (): DatesContent => {
  return parseMarkdown<Omit<DatesContent, 'body'>>(datesMd);
};

export const getHeroImage = (): string => {
  // Using eager loading for the hero image
  const modules = import.meta.glob('../assets/images/hero/*.{jpg,jpeg,png,webp}', { eager: true });
  const path = Object.keys(modules)[0];
  return path ? (modules[path] as { default: string }).default : '';
};

export const getGalleryImages = (): ImageAsset[] => {
  const modules = import.meta.glob('../assets/images/gallery/*.{jpg,jpeg,png,webp}', { eager: true });
  
  return Object.keys(modules)
    .sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((path) => ({
      src: (modules[path] as { default: string }).default,
      alt: path.split('/').pop()?.split('.')[0] || 'Gallery image',
    }));
};
