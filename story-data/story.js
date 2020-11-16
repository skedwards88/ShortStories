//  todo would be nice to have data validators--
//  tags must be list of enum values, author must be on of enum, ...
export class Story {
    constructor({title, text, author, date, tags}) {
        this.title = title;
        this.text = text;
        this.author = author;
        this.date = date;
        this.tags = tags;
    }
}