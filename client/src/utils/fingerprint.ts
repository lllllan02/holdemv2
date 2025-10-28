import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fpPromise = FingerprintJS.load();

/**
 * 获取浏览器指纹
 */
export async function getFingerprint(): Promise<string> {
  try {
    const fp = await fpPromise;
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error('获取指纹失败:', error);
    // 如果指纹获取失败，使用本地存储的指纹或生成临时指纹
    const storedFingerprint = localStorage.getItem('fingerprint');
    if (storedFingerprint) {
      return storedFingerprint;
    }
    // 生成临时指纹
    const tempFingerprint = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('fingerprint', tempFingerprint);
    return tempFingerprint;
  }
}

/**
 * 初始化指纹并存储到本地
 */
export async function initFingerprint(): Promise<string> {
  const fingerprint = await getFingerprint();
  localStorage.setItem('fingerprint', fingerprint);
  return fingerprint;
}

