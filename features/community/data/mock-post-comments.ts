export type MockComment = {
  id: number;
  authorName: string;
  body: string;
  createdAt: string;
};

export const MOCK_COMMENTS_BY_POST: Record<number, MockComment[]> = {
  101: [
    {
      id: 1,
      authorName: "애니덕후",
      body: "프리렌이랑 봇치 조합 미쳤다… 저도 비슷하게 짜봐야겠어요.",
      createdAt: "2026-05-10T16:00:00",
    },
    {
      id: 2,
      authorName: "라면만두",
      body: "체인소 1위 인정입니다. 2기 언제죠",
      createdAt: "2026-05-10T17:22:00",
    },
  ],
  102: [
    {
      id: 3,
      authorName: "배구부",
      body: "하이큐는 영원한 고트",
      createdAt: "2026-05-09T12:00:00",
    },
  ],
  104: [
    {
      id: 4,
      authorName: "설렘지기",
      body: "토라도라 1순위 너무 좋아요 ㅠㅠ",
      createdAt: "2026-05-07T14:30:00",
    },
    {
      id: 5,
      authorName: "클라나드러버",
      body: "클라나드 빠지면 섭섭한데 여기 있네요 굿",
      createdAt: "2026-05-07T15:01:00",
    },
  ],
};

export function getMockComments(postId: number): MockComment[] {
  return MOCK_COMMENTS_BY_POST[postId] ?? [];
}
