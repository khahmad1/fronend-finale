import "./dashboard.css";
import WorkIcon from "@mui/icons-material/Work";
import LoopIcon from '@mui/icons-material/Loop';
import DoneIcon from '@mui/icons-material/Done';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
function CardDash() {
  return (
    <div className="all-card">
      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title">Facility</p>
          <h2 className="card-text text-amount">350,897</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-area">
            <i className="fa fa-area-chart" aria-hidden="true">
              <WorkIcon />
            </i>
          </div>
        </div>
      </div>

      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title">Order</p>
          <h2 className="card-text text-amount">2,356</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-pie">
            <i className="fa fa-pie-chart" aria-hidden="true">
             <DoneIcon/>
            </i>
          </div>
        </div>
      </div>

      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title">Order in progress</p>
          <h2 className="card-text text-amount">924</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-user">
            <i className="fa fa-users" aria-hidden="true">
              <LoopIcon/>
            </i>
          </div>
        </div>
      </div>

      <div className="card_dash">
        <div className="col">
          <p className="card-title text-title">order on the way</p>
          <h2 className="card-text text-amount">49,65%</h2>
        </div>
        <div className="col-auto">
          <div className="icon-shape icon-percent">
            <i className="fa fa-percent" aria-hidden="true">
<DeliveryDiningIcon/>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardDash;