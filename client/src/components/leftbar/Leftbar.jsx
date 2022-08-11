import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import StoreIcon from "@mui/icons-material/Store";
import YouTubeIcon from "@mui/icons-material/YouTube";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Leftbar() {
  return (
    <div className="leftbarContainer">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <PeopleAltIcon className="leftbarIcon" />
            <span className="leftbarListItemText">朋友</span>
          </li>
          <li className="leftbarListItem">
            <GroupsIcon className="leftbarIcon" />
            <span className="leftbarListItemText">社團</span>
          </li>
          <li className="leftbarListItem">
            <StoreIcon className="leftbarIcon" />
            <span className="leftbarListItemText">商店</span>
          </li>
          <li className="leftbarListItem">
            <YouTubeIcon className="leftbarIcon" />
            <span className="leftbarListItemText">影片</span>
          </li>
          <li className="leftbarListItem">
            <HistoryIcon className="leftbarIcon" />
            <span className="leftbarListItemText">動態回顧</span>
          </li>
          <li className="leftbarListItem">
            <KeyboardArrowDownIcon className="leftbarIcon more" />
            <span className="leftbarListItemText">顯示更多</span>
          </li>
        </ul>

        <hr className="leftbarHr" />
        <span className="leftbarShortcutTitle">你的捷徑</span>
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <PeopleAltIcon className="leftbarIcon" />
            <span className="leftbarListItemText">朋友</span>
          </li>
          <li className="leftbarListItem">
            <GroupsIcon className="leftbarIcon" />
            <span className="leftbarListItemText">社團</span>
          </li>
          <li className="leftbarListItem">
            <StoreIcon className="leftbarIcon" />
            <span className="leftbarListItemText">商店</span>
          </li>
          <li className="leftbarListItem">
            <YouTubeIcon className="leftbarIcon" />
            <span className="leftbarListItemText">影片</span>
          </li>
          <li className="leftbarListItem">
            <HistoryIcon className="leftbarIcon" />
            <span className="leftbarListItemText">動態回顧</span>
          </li>
          <li className="leftbarListItem">
            <PeopleAltIcon className="leftbarIcon" />
            <span className="leftbarListItemText">朋友</span>
          </li>
          <li className="leftbarListItem">
            <GroupsIcon className="leftbarIcon" />
            <span className="leftbarListItemText">社團</span>
          </li>
          <li className="leftbarListItem">
            <StoreIcon className="leftbarIcon" />
            <span className="leftbarListItemText">商店</span>
          </li>
          <li className="leftbarListItem">
            <YouTubeIcon className="leftbarIcon" />
            <span className="leftbarListItemText">影片</span>
          </li>
          <li className="leftbarListItem">
            <HistoryIcon className="leftbarIcon" />
            <span className="leftbarListItemText">動態回顧</span>
          </li>
          <li className="leftbarListItem">
            <PeopleAltIcon className="leftbarIcon" />
            <span className="leftbarListItemText">朋友</span>
          </li>
          <li className="leftbarListItem">
            <GroupsIcon className="leftbarIcon" />
            <span className="leftbarListItemText">社團</span>
          </li>
          <li className="leftbarListItem">
            <StoreIcon className="leftbarIcon" />
            <span className="leftbarListItemText">商店</span>
          </li>
          <li className="leftbarListItem">
            <YouTubeIcon className="leftbarIcon" />
            <span className="leftbarListItemText">影片</span>
          </li>
          <li className="leftbarListItem">
            <HistoryIcon className="leftbarIcon" />
            <span className="leftbarListItemText">動態回顧</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
