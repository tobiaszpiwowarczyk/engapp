import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import { Unit } from './../../modules/main/home/components/unit/Unit';
import { DropFile } from '../../components/file-input/services/DropFile';


@Injectable()
export class UnitService {

  private headers: Headers;
  private options: RequestOptionsArgs;

  constructor(
    private http: Http,
    private ls: LoginService
  ) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append(this.ls.AUTHORIZATION_HEADER, this.ls.getAccessToken());

    this.options = {
      headers: this.headers
    };
  }

  /**
   * Retrieves all units from database and map it
   * into array of {@link Unit} objects
   * @returns {@link Unit[]} if user is administrator
   * @throws http status "Forbidden" if user is not an administrator
   */
  public findAll(): Observable<Array<Unit>> {
    return this.http.get("/db/api/unit", this.options)
      .map(res => res.json().map(x => new Unit(x)))
      .catch(err => Observable.throw(err.json()));
  }

  /**
   * Finds unit by 'id'
   * 
   * @param id {@link string} - must not be null
   * @returns {@link Unit} id unit exists
   * @throws "Forbidden" error if unit not exists
   */
  public findById(id: string): Observable<Unit> {
    return this.http.get(`/db/api/unit/${id}`, this.options)
      .map(res => new Unit(res.json()))
      .catch(err => Observable.throw(err.json().errors));
  }

  /**
   * Add unit to database
   * @param unit {@link Unit} - must be valid
   * @returns {@link Unit} - the new unit
   * @throws "Forbidden" error if user is not an administrator
   */
  public addUnit(unit: Unit): Observable<Unit> {
    return this.http.post("/db/api/unit", JSON.stringify(unit), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json().errors));
  }


  /**
   * Method for unit addition validation
   *
   * @param unit {@link Unit} - the unit
   * @param field {@link string} - field name from {@link Unit} object
   * @returns empty array with http status 200 if unit object is valid,
   *          otherwise returns error list with http status 422 (Unprocessable Entity)
   */
  public addUnitValidation(unit: Unit, field: string): Observable<any> {
    return this.http.post(`/db/api/unit/validate?field=${field}`, JSON.stringify(unit), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }


  /**
   * Modify unit, save to database and return it
   * 
   * @param unit {@link Unit} - unit, must be valid
   * @returns {@link Unit} - modified unit
   */
  public editUnit(unit: Unit): Observable<Unit> {
    return this.http.put("/db/api/unit", JSON.stringify(unit), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }


  /**
   * Method for unit edition validation
   * 
   * @param unit {@link Unit} - the unit
   * @param field {@link string} - field name from {@link Unit} object
   * @returns empty array with http status 200 if unit object is valid,
   *          otherwise returns error list with http status 422 (Unprocessable Entity)
   */
  public editUnitValidation(unit: Unit, field: string): Observable<any> {
    return this.http.put(`/db/api/unit/validate?field=${field}`, JSON.stringify(unit), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

  /**
   * Updates unit image
   * 
   * @param unitId {@link string} - the unit id
   * @param file {@link DropFile} - file with base64 encoded data
   * @returns {@link Unit} - updated unit
   */
  public editUnitImage(unitId: string, file: DropFile): Observable<Unit> {
    return this.http.put(`/db/api/unit/${unitId}/image`, JSON.stringify(file), this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }


  /**
   * Removes unit from database
   * @param id {@link string} - unit identifier
   * @returns information about unit deletion
   */
  public deleteUnit(id: string): Observable<any> {
    return this.http.delete(`/db/api/unit/${id}`, this.options)
      .map(res => res.json())
      .catch(err => Observable.throw(err.json()));
  }

}
