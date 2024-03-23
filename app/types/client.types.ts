export type ClientPost = {
    bids: string;
    client_id: string;
    content: string;
    created_at: string;
    deadline: string;
    desc: string;
    id: number;
    min_proposals: string;
    status: string | number;
    thumbnail: string;
    title: string;
    updated_at: string;
};

export type ClientPostList = ClientPost[];

export type DetailClientPost = {
    id: number,
    client_id: number,
    title: string,
    desc: string,
    content: string,
    thumbnail: string,
    bids: number,
    status: number,
    deadling: string,
    created_at: string,
    updated_at: string
}