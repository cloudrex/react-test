export default abstract class Util {
    /**
     * Determine whether a character is in its uppercase
     * form.
     */
    public static isUppercase(char: string): boolean {
        return char.toUpperCase() === char;
    }
}
