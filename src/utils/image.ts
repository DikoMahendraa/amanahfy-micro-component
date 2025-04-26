/**
 * Generates an avatar URL based on provided parameters
 *
 * @param {string | null | undefined} url - An existing avatar URL (if available)
 * @param {string | null | undefined} title - Display name to use for generating default avatar
 * @param {boolean} [rounded=true] - Whether the avatar should have rounded corners
 * @returns {string} URL to the avatar image
 *
 * @example
 * // Returns the provided URL
 * getAvatar('https://example.com/avatar.png', 'John Doe')
 *
 * // Returns a default avatar with the name "John Doe"
 * getAvatar(null, 'John Doe')
 *
 * // Returns a default avatar with square corners
 * getAvatar(null, 'John Doe', false)
 */
export const getAvatar = (
  url: string | null | undefined,
  title: string | null | undefined,
  rounded = true
): string => {
  // Normalize the title for the default avatar
  const displayName = (title || "").trim() || "User";

  // Create the default avatar URL
  const defaultAvatarUrl = `https://ui-avatars.com/api/?format=svg&rounded=${rounded}&name=${displayName}&background=random`;

  // Return existing URL if it's valid and not already a ui-avatars URL
  if (url && !url.startsWith("https://ui-avatars.com")) {
    return url;
  }

  // Otherwise return the default avatar
  return defaultAvatarUrl;
};

/**
 * Converts a File object to a base64-encoded string
 *
 * @param {File} file - The file to convert to base64
 * @returns {Promise<string>} Promise resolving to the base64 representation of the file
 *
 * @example
 * // Convert an image file to base64
 * const fileInput = document.querySelector('input[type="file"]');
 * const file = fileInput.files[0];
 *
 * imageToBase64(file)
 *   .then(base64String => {
 *     console.log(base64String); // data:image/jpeg;base64,...
 *   })
 *   .catch(error => {
 *     console.error('Error converting image:', error);
 *   });
 */
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Type assertion to ensure result is treated as string
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Convert file to base64 data URL
    reader.readAsDataURL(file);
  });
};
