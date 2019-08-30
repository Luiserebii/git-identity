/**
 * Interface JSONMetadata
 * 
 * @author Luiserebii <luis@serebii.io>
 * @description Simple interface describing the expected properties we look for in a JSONMetadata object.
 * TODO: Consider renaming this, why call it JSONMetadata? Why not something like ProjectMetadata?
 */
interface JSONMetadata {
  version: string;
  description: string;
}

export = JSONMetadata;
