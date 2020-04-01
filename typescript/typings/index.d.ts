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