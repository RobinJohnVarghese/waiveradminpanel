export const formatImageUrl = (productImageUrl?: string): string => {
    if (!productImageUrl) return '';
  
    const formattedUrl = productImageUrl.startsWith('http')
      ? productImageUrl
      : `${process.env.BACKEND_URL}${productImageUrl.startsWith('/') ? '' : '/'}${productImageUrl}`;
  
    return formattedUrl;
  };
  
  

export const screenWidth: any = typeof window !== "undefined" ? window.innerWidth : '';
export const screenHeight: any = typeof window !== "undefined" ? window.innerHeight : '';