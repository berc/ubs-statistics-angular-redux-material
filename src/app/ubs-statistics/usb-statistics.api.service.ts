import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { StatItem } from './model/stat-item';

@Injectable()
export class UbsStatisticsApiService {

    private urlPrefix = 'assets';

    constructor( private http: Http) {}

    public getGeoZones(): Observable<StatItem[]>  {
        return this.http.get(`${this.urlPrefix}/data/geo-zones.json`)
            .map( (rs: Response) => rs.json() )
            .catch( (error: Response | any) => Observable.throw(error.json()) );
    }

    public getUbsStatistics(): Observable<StatItem[]>  {
        return this.http.get(`${this.urlPrefix}/data/ubs-statistics.json`)
            .map( (rs: Response) => rs.json() )
            .catch( (error: Response | any) => Observable.throw(error.json()) );
    }
}
