
import React from 'react';

export interface ServiceItem {
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  icon: string;
}

export interface FeatureCard {
  id: string;
  title: { en: string; fr: string };
  tag: string;
  content: { en: string; fr: string };
  icon: string;
}

export interface ApproachStep {
  stage: string;
  label: { en: string; fr: string };
  details: { en: string; fr: string };
}

/* 
 * Fix: Move 'iconify-icon' declaration into declare global to resolve the 'module react not found' 
 * augmentation error. This ensures the custom element is correctly added to the JSX namespace 
 * globally without shadowing existing HTML elements.
 */
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }

  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon: string;
        width?: string | number;
        height?: string | number;
        rotate?: string | number;
        flip?: string;
        mode?: string;
        inline?: boolean;
        [key: string]: any;
      };
    }
  }
}
