export type Filter = {
  year: string;
  voteLte: string;
  voteGte: string;
}


export const getInitailQueryString = ()=> {
    if (typeof window !== "undefined") {
        const urlSearchParam = new URLSearchParams(window.location.search);
        const page = urlSearchParam.get('page');
        const voteGte = urlSearchParam.get('vote_average.gte');
        const voteLte = urlSearchParam.get('vote_average.lte');
        const year = urlSearchParam.get('year')
        
        const qs0 = page ? updateQueryStringParameter('','page',page) : ''
        const qs1 = voteGte ? updateQueryStringParameter(qs0,'vote_average.gte',voteGte) : qs0
        const qs2 = voteLte ? updateQueryStringParameter(qs1,'vote_average.lte',voteLte) : qs1
        const qs3 = year ? updateQueryStringParameter(qs2,'year',year) : qs2;
       return qs3
       }
       return ''  
}

export const updateQueryStringParameter = (
    uri: string,
    key: string,
    value: string
  )=> {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = "&";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  }
  