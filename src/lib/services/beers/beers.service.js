import { map } from 'rxjs/operators'
import { httpService } from '../../base'
import { getBeersEndpoint } from './beers.config'
export class BeersService {
  getBeers(options) {
    return httpService
      .get({
        path: getBeersEndpoint(),
        queryParameters: {
          page: options.page || 0,
        },
      })
      .pipe(
        map((response) => {
          return {
            data: response,
          }
        })
      )
  }
}
