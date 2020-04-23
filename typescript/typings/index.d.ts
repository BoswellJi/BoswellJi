declare namespace GreetingLib {
  interface LogOptions {
      verbose?: boolean;
  }
  interface AlertOptions {
      modal: boolean;
      title?: string;
      color?: string;
  }
}

declare let nameSelf: string;

declare module mod1{
   const name1: string;
}