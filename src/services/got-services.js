import { CardHeader } from "reactstrap";

export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._trasnformCharacter)
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._trasnformCharacter(character)
    }

    getAllBooks() {
        return this.getResource('/books/')
    }
    getBook(id) {
        return this.getResource(`/books/${id}`)
    }

    getAllHouses() {
        return this.getResource('/houses/')
    }
    getHouse(id) {
        return this.getResource(`/houses/${id}`)
    }

    _trasnformCharacter(char) {
        return {
            url: char.url,
            name: char.name ? char.name : 'no data :>',
            gender: char.gender ? char.gender : 'no data :>',
            born: char.born ? char.born : 'no data :>',
            died: char.died ? char.died : 'no data :>',
            culture: char.culture ? char.culture : 'no data :>'
        }
    }

    _trasnformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }

    _trasnformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
}