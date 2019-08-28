class NoOldEmailOldNameError extends Error {
  constructor() {
    super("Error: No from email nor from name specified");
  }
}

export = NoOldEmailOldNameError;
