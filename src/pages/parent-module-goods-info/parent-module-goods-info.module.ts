import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentModuleGoodsInfoPage } from './parent-module-goods-info';

@NgModule({
  declarations: [
    ParentModuleGoodsInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentModuleGoodsInfoPage),
  ],
})
export class ParentModuleGoodsInfoPageModule {}
