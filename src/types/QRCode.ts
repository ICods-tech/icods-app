export interface QRCode {
  id: string;
  status:  'ACTIVE' | 'INACTIVE' | 'IN_PROGRESS';
  link: string;
  content: string;
  postId: string;
  user: string;
  receivedUser: {
    id: string;
    name: string;
    username: string;
    email: string;
    visibility: boolean;
  };
}
