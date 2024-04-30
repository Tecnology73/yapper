export namespace main {
	
	export class Meta {
	    title: string;
	    description: string;
	    type: string;
	    url: string;
	    image: string;
	    siteName: string;
	
	    static createFrom(source: any = {}) {
	        return new Meta(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.description = source["description"];
	        this.type = source["type"];
	        this.url = source["url"];
	        this.image = source["image"];
	        this.siteName = source["siteName"];
	    }
	}

}

