// Type definitions for path aliases
declare module '@/components/*' {
  import { FC, ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}

declare module '@/pages/*' {
  import { FC, ComponentType } from 'react';
  const Component: ComponentType<any>;
  export default Component;
}

declare module '@/lib/*' {
  const value: any;
  export default value;
}

declare module '@/utils/*' {
  const value: any;
  export default value;
}

declare module '@/hooks/*' {
  const value: any;
  export default value;
}

declare module '@/context/*' {
  const value: any;
  export default value;
}

declare module '@/types/*' {
  const value: any;
  export default value;
}

declare module '@/styles/*' {
  const value: any;
  export default value;
}

declare module '@/assets/*' {
  const value: any;
  export default value;
}

declare module '@/constants/*' {
  const value: any;
  export default value;
}
