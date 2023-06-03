import "./closeFriend.css";


export default function CloseFriend({user}) {
  const url = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={url+user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
