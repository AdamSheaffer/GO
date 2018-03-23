import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Park } from '../../../../shared/park.model';
import { ParkService } from '../../../core/services';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ParkResolverService implements Resolve<Park> {

  constructor(
    private parkService: ParkService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Park> {
    const team = route.paramMap.get('team');
    return this.parkService.getParkByTeam(team).then(data => {
      if (data.success) return data.park;

      this.router.navigate(['/404']);
      return null;
    }).catch(err => {
      this.router.navigate(['/404']);
      return null;
    });
  }
}
