import { atom } from 'recoil';
interface Account {
    firstName: string;
    // Thêm các thuộc tính khác nếu cần thiết
  }
  export const foundAccountState = atom<Account | null>({
    key: 'foundAccountState',
    default: null,
  });