import {post, get, put, remove} from './crud';

class GamesService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/game';
        this.createUrl = `${this.baseUrl}/create`;
        this.editUrl = `${this.baseUrl}/edit`;
        this.getUrl = `${this.baseUrl}/all`;
        this.deleteUrl = `${this.baseUrl}/delete`
        this.detialsUrl = `${this.baseUrl}/details`;
    }
    
    createGame(data) {
        return post(this.createUrl,data);
    }
    editGame(data) {
        let id = data.id;
        return put(`${this.editUrl}/${id}`,data);
    }
    detailsGame(data) {
        let id = data.id;
        return put(`${this.detialsUrl}/${id}`,data);
    }
    deleteGame(id) {
        return remove(`${this.deleteUrl}/${id}`);
    }

    getGames() {
        return get(this.getUrl);
    }

    getGame(id) {
        return get(`${this.baseUrl}/${id}`);
    }

}

export default GamesService
