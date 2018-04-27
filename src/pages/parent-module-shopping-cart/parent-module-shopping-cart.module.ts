import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentModuleShoppingCartPage } from './parent-module-shopping-cart';

@NgModule({
  declarations: [
    ParentModuleShoppingCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentModuleShoppingCartPage),
  ],
})
export class ParentModuleShoppingCartPageModule {}
