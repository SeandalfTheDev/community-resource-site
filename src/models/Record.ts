export interface Fields {
    Url: string;
    Title: string;
}

export interface Record {
    id: string;
    createdTime: Date;
    fields: Fields;
}