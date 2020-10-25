export interface UserModel {
    id: number;
    chat_id: number;
}

export interface MusicModel {
    id: number;
    title: string;
    duration: number;
    added_at: Date;
    added_by: number;
    file_id: string;
    file_unique_id: string;
}
