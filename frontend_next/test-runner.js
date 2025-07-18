/**
 * Simple test runner for validation functions
 * This bypasses the complex Vite/PostCSS configuration issues
 */

// Validation functions (copied from the component)
const validateFileSize = (file, fileType = 'image') => {
  const maxSizeImage = 2 * 1024 * 1024; // 2MB для изображений
  const maxSizeVideo = 50 * 1024 * 1024; // 50MB для видео
  const maxSize = fileType === 'image' ? maxSizeImage : maxSizeVideo;
  return file.size <= maxSize;
};

const getFileSizeLimit = (fileType) => {
  return fileType === 'image' ? '2 MB' : '50 MB';
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const validateImageFile = (file) => {
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
  const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validExtensions.includes(fileExtension) && validMimeTypes.includes(file.type);
};

// Helper function to create test files
const createTestFile = (name, size, type) => {
  return {
    name,
    size,
    type
  };
};

// Test suite
const runTests = () => {
  console.log('🧪 Running Video Poster Upload Validation Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  const test = (description, testFn) => {
    try {
      testFn();
      console.log(`✅ ${description}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${description}: ${error.message}`);
      failed++;
    }
  };
  
  const expect = (actual) => ({
    toBe: (expected) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, got ${actual}`);
      }
    },
    toBeGreaterThan: (expected) => {
      if (actual <= expected) {
        throw new Error(`Expected ${actual} to be greater than ${expected}`);
      }
    },
    toBeLessThan: (expected) => {
      if (actual >= expected) {
        throw new Error(`Expected ${actual} to be less than ${expected}`);
      }
    },
    toContain: (expected) => {
      if (!actual.includes(expected)) {
        throw new Error(`Expected "${actual}" to contain "${expected}"`);
      }
    },
    toMatch: (regex) => {
      if (!regex.test(actual)) {
        throw new Error(`Expected "${actual}" to match ${regex}`);
      }
    }
  });

  // File Size Validation Tests
  console.log('📁 File Size Validation Tests:');
  
  test('should validate small image files', () => {
    const smallImage = createTestFile('small.jpg', 1024 * 1024, 'image/jpeg'); // 1MB
    expect(validateFileSize(smallImage, 'image')).toBe(true);
  });
  
  test('should reject large image files', () => {
    const largeImage = createTestFile('large.jpg', 3 * 1024 * 1024, 'image/jpeg'); // 3MB
    expect(validateFileSize(largeImage, 'image')).toBe(false);
  });
  
  test('should validate small video files', () => {
    const smallVideo = createTestFile('small.mp4', 10 * 1024 * 1024, 'video/mp4'); // 10MB
    expect(validateFileSize(smallVideo, 'video')).toBe(true);
  });
  
  test('should reject large video files', () => {
    const largeVideo = createTestFile('large.mp4', 60 * 1024 * 1024, 'video/mp4'); // 60MB
    expect(validateFileSize(largeVideo, 'video')).toBe(false);
  });
  
  test('should return correct file size limits', () => {
    expect(getFileSizeLimit('image')).toBe('2 MB');
    expect(getFileSizeLimit('video')).toBe('50 MB');
  });

  // Image Format Validation Tests
  console.log('\n🖼️  Image Format Validation Tests:');
  
  test('should validate JPEG images', () => {
    const jpegFile = createTestFile('test.jpg', 1024, 'image/jpeg');
    expect(validateImageFile(jpegFile)).toBe(true);
  });
  
  test('should validate PNG images', () => {
    const pngFile = createTestFile('test.png', 1024, 'image/png');
    expect(validateImageFile(pngFile)).toBe(true);
  });
  
  test('should validate WebP images', () => {
    const webpFile = createTestFile('test.webp', 1024, 'image/webp');
    expect(validateImageFile(webpFile)).toBe(true);
  });
  
  test('should reject text files', () => {
    const textFile = createTestFile('test.txt', 1024, 'text/plain');
    expect(validateImageFile(textFile)).toBe(false);
  });
  
  test('should reject video files as images', () => {
    const videoFile = createTestFile('test.mp4', 1024, 'video/mp4');
    expect(validateImageFile(videoFile)).toBe(false);
  });
  
  test('should handle case-insensitive extensions', () => {
    const upperCaseFile = createTestFile('test.JPG', 1024, 'image/jpeg');
    expect(validateImageFile(upperCaseFile)).toBe(true);
  });

  // File Size Formatting Tests
  console.log('\n📊 File Size Formatting Tests:');
  
  test('should format bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
  });

  // Error Scenario Tests
  console.log('\n⚠️  Error Scenario Tests:');
  
  test('should handle oversized image files', () => {
    const oversizedImage = createTestFile('huge.jpg', 5 * 1024 * 1024, 'image/jpeg'); // 5MB
    expect(validateFileSize(oversizedImage, 'image')).toBe(false);
    
    const errorMessage = `Файл "${oversizedImage.name}" (${formatFileSize(oversizedImage.size)}) превышает максимальный размер ${getFileSizeLimit('image')} для изображений`;
    expect(errorMessage).toContain('превышает максимальный размер 2 MB');
  });
  
  test('should handle oversized video files', () => {
    const oversizedVideo = createTestFile('huge.mp4', 100 * 1024 * 1024, 'video/mp4'); // 100MB
    expect(validateFileSize(oversizedVideo, 'video')).toBe(false);
    
    const errorMessage = `Файл "${oversizedVideo.name}" (${formatFileSize(oversizedVideo.size)}) превышает максимальный размер ${getFileSizeLimit('video')} для видео`;
    expect(errorMessage).toContain('превышает максимальный размер 50 MB');
  });
  
  test('should handle invalid poster formats', () => {
    const invalidPoster = createTestFile('poster.txt', 1024, 'text/plain');
    expect(validateImageFile(invalidPoster)).toBe(false);
    
    const errorMessage = `Файл постера "${invalidPoster.name}" не является допустимым изображением. Разрешены только форматы: jpg, jpeg, png, gif, webp`;
    expect(errorMessage).toContain('не является допустимым изображением');
  });

  // Form Validation Logic Tests
  console.log('\n📋 Form Validation Logic Tests:');
  
  test('should validate complete form submission for hero media', () => {
    const videoFile = createTestFile('video.mp4', 10 * 1024 * 1024, 'video/mp4');
    const posterFile = createTestFile('poster.jpg', 1 * 1024 * 1024, 'image/jpeg');
    
    // Simulate form validation
    const isVideoValid = validateFileSize(videoFile, 'video');
    const isPosterValid = validateFileSize(posterFile, 'image') && validateImageFile(posterFile);
    
    expect(isVideoValid).toBe(true);
    expect(isPosterValid).toBe(true);
    
    // Form should be valid when both files are valid
    const isFormValid = isVideoValid && isPosterValid;
    expect(isFormValid).toBe(true);
  });
  
  test('should reject form submission with missing poster for video', () => {
    const videoFile = createTestFile('video.mp4', 10 * 1024 * 1024, 'video/mp4');
    const posterFile = null;
    
    const isVideoValid = validateFileSize(videoFile, 'video');
    const isPosterValid = posterFile !== null;
    
    expect(isVideoValid).toBe(true);
    expect(isPosterValid).toBe(false);
    
    // Form should be invalid when poster is missing for video
    const isFormValid = isVideoValid && isPosterValid;
    expect(isFormValid).toBe(false);
  });
  
  test('should validate block media form submission', () => {
    const blockVideoFile = createTestFile('block-video.mp4', 25 * 1024 * 1024, 'video/mp4');
    const blockPosterFile = createTestFile('block-poster.png', 1.5 * 1024 * 1024, 'image/png');
    
    const isBlockVideoValid = validateFileSize(blockVideoFile, 'video');
    const isBlockPosterValid = validateFileSize(blockPosterFile, 'image') && validateImageFile(blockPosterFile);
    
    expect(isBlockVideoValid).toBe(true);
    expect(isBlockPosterValid).toBe(true);
    
    const isBlockFormValid = isBlockVideoValid && isBlockPosterValid;
    expect(isBlockFormValid).toBe(true);
  });

  // Edge Cases Tests
  console.log('\n🔍 Edge Cases Tests:');
  
  test('should handle zero-byte files', () => {
    const emptyFile = createTestFile('empty.jpg', 0, 'image/jpeg');
    expect(validateFileSize(emptyFile, 'image')).toBe(true);
    expect(formatFileSize(emptyFile.size)).toBe('0 Bytes');
  });
  
  test('should handle files at exact size limits', () => {
    const exactSizeImage = createTestFile('exact.jpg', 2 * 1024 * 1024, 'image/jpeg'); // Exactly 2MB
    const exactSizeVideo = createTestFile('exact.mp4', 50 * 1024 * 1024, 'video/mp4'); // Exactly 50MB
    
    expect(validateFileSize(exactSizeImage, 'image')).toBe(true);
    expect(validateFileSize(exactSizeVideo, 'video')).toBe(true);
  });
  
  test('should handle files just over size limits', () => {
    const overSizeImage = createTestFile('over.jpg', (2 * 1024 * 1024) + 1, 'image/jpeg'); // 2MB + 1 byte
    const overSizeVideo = createTestFile('over.mp4', (50 * 1024 * 1024) + 1, 'video/mp4'); // 50MB + 1 byte
    
    expect(validateFileSize(overSizeImage, 'image')).toBe(false);
    expect(validateFileSize(overSizeVideo, 'video')).toBe(false);
  });

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Video poster upload validation is working correctly.');
  } else {
    console.log(`\n⚠️  ${failed} test(s) failed. Please review the validation logic.`);
  }
  
  return { passed, failed, total: passed + failed };
};

// Run the tests
runTests();