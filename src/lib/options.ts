export const MINISTRY_PARTS = ['찬양 인도', '보컬', '피아노', '키보드', '어쿠스틱 기타', '일렉 기타', '베이스', '드럼', '미디어', '음향', '교육', '청년', '아동', '행정'];
export const ORGANIZATION_TYPES = ['교회', '선교단체', '캠퍼스 사역', '기독교 기관', '기타'];

export function ageRange(birthYear?: number | null) {
  if (!birthYear) return '미입력';
  const age = new Date().getFullYear() - birthYear;
  return `${Math.floor(age / 10) * 10}대`;
}
