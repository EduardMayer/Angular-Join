import { Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { AddTaskComponent } from './mainscreen/add-task/add-task.component';


export const routes: Routes = [
    { path: '', component: MainscreenComponent },
    //{ path: '', component: StartscreenComponent },

]