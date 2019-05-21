export default class NPM {

    static root = "https://www.npmjs.com/search/suggestions?q=";

    static getSearchQuery(searchText){
        return `${NPM.root}${encodeURI(searchText)}`;
    }

    static async getScaffolds(){
        const data = await fetch(
            NPM.getSearchQuery('webpack-scaffold')
        ).then(
            res => res.json()
        ).then(
            res => res.filter(pack => pack.name.startsWith("webpack-scaffold"))
        );
        return data;
    }
}