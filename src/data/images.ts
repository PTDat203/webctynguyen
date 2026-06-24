import type { ImageMetadata } from 'astro';
import hero from '../assets/hero.jpg';
import about from '../assets/about.jpg';
import sBooth from '../assets/service-booth.jpg';
import sStage from '../assets/service-stage.jpg';
import sMedia from '../assets/service-media.jpg';
import sTurnkey from '../assets/service-turnkey.jpg';
import sB2b from '../assets/service-b2b.jpg';
import pDongfest from '../assets/proj-dongfest.jpg';
import pThanhpho from '../assets/proj-thanhpho.jpg';
import pSaonhapngu from '../assets/proj-saonhapngu.jpg';
import pDiendan from '../assets/proj-diendan.jpg';
import pHoithao from '../assets/proj-hoithao.jpg';
import pXuctien from '../assets/proj-xuctien.jpg';
import pRamat from '../assets/proj-ramat.jpg';
import pGianhang from '../assets/proj-gianhang.jpg';

export const heroImage = hero;
export const aboutImage = about;

// key = Service.id (xem src/data/site.ts)
export const serviceImages: Record<string, ImageMetadata> = {
  'thi-cong-gian-hang': sBooth,
  'dan-dung-su-kien': sStage,
  'truyen-thong': sMedia,
  'to-chuc-tron-goi': sTurnkey,
  b2b: sB2b,
};

// key = Project.title (xem src/data/site.ts)
export const projectImages: Record<string, ImageMetadata> = {
  'Đông Fest': pDongfest,
  'Những thành phố mơ màng': pThanhpho,
  'Concert "Sao nhập ngũ"': pSaonhapngu,
  'Diễn đàn doanh nghiệp': pDiendan,
  'Hội thảo chuyên biệt': pHoithao,
  'Hội nghị xúc tiến thương mại': pXuctien,
  'Lễ ra mắt sản phẩm': pRamat,
  'Gian hàng triển lãm tiêu chuẩn & đặc biệt': pGianhang,
};
