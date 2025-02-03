import React from 'react';
import classes from './truck-loader.module.css';

export function TruckLoader() {
  return (
    <div className={classes['truck-loader']}>
      <div className={classes['transport-truck']}>
        <div className={classes.cabin}>
          <div className={classes.window}></div>
        </div>
        <div className={classes.trailer}>
          <div className={classes.ramp}></div>
        </div>
        <div className={classes.wheels}>
          <div className={classes.wheel}></div>
          <div className={classes.wheel}></div>
          <div className={classes.wheel}></div>
        </div>
      </div>
      
      <div className={classes.truck}>
        <div className={classes['truck-body']}>
          <div className={classes['truck-cabin']}>
            <div className={classes['truck-window']}></div>
          </div>
          <div className={classes['truck-cargo']}></div>
        </div>
        <div className={classes['truck-wheels']}>
          <div className={classes.wheel}></div>
          <div className={classes.wheel}></div>
        </div>
      </div>
      
      <div className={classes.road}>
        <div className={classes.stripe}></div>
      </div>
    </div>
  );
}