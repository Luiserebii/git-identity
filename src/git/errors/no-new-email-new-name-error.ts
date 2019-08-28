class NoNewEmailNewName extends Error {
  constructor() {
    super("Error: No to email nor to name specified");
  }
}

export = NoNewEmailNewName;
