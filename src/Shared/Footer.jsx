

const Footer = () => {
    return (
        <div className="">
      <div className="">
      <footer className="footer bg-[#0f0f0e] text-base-content p-10 mt-20">
  <aside className="flex gap-2 items-center">
    <img className="h-10" src="images/flogo.JPG" />
    <p className="font-bold text-white">
      FURNi<span className="text-[#1f98f5]">FLEX</span>
    </p>
  </aside>
  <nav>
    <h6 className="footer-title text-white">About Us</h6>
    <a className="link link-hover text-[#81849e]">Master Plan</a>
    <a className="link link-hover text-[#81849e]">Jobs</a>
    <a className="link link-hover text-[#81849e]">Invest</a>
    <a className="link link-hover text-[#81849e]">Pressroom</a>
    <a className="link link-hover text-[#81849e]">Blog</a>
    <a className="link link-hover text-[#81849e]">Contact</a>
  </nav>
  <nav>
    <h6 className="footer-title text-white">Explore EEVE</h6>
    <a className="link link-hover text-[#81849e]">Unlock My Robot Power</a>
    <a className="link link-hover text-[#81849e]">Starlight</a>
    <a className="link link-hover text-[#81849e]">Robot Platform</a>
    <a className="link link-hover text-[#81849e]">EEVE Roadmap</a>
  </nav>
  <nav>
    <h6 className="footer-title text-white">Community & Support</h6>
    <a className="link link-hover text-[#81849e]">Willow X Community</a>
    <a className="link link-hover text-[#81849e]">Dveloper & Master Access</a>
    <a className="link link-hover text-[#81849e]">Special Classes</a>
  </nav>
</footer>
<footer className="footer bg-[#0f0f0e] text-base-content border-base-300 border-t px-10 py-4">
  <aside className="grid-flow-col items-center">
   <img className="h-10" src="images/f.JPG" alt="" srcset="" />
   <img className="h-10" src="images/i.JPG" alt="" srcset="" />
   <img className="h-10" src="images/x.JPG" alt="" srcset="" />
   <img className="h-10" src="images/l.JPG" alt="" srcset="" />
  </aside>
  <div className="flex gap-4 justify-center">
    <a className="text-[#81849e] font-semibold" href="#">March22 Recape</a>
    <a className="text-[#81849e] font-semibold" href="#">Privacy Policy</a>
    <a className="text-[#81849e] font-semibold" href="#">General Terms</a>
    <a className="text-[#81849e] font-semibold" href="#">Contact</a>
  </div>
  <nav className="md:place-self-center md:justify-self-end">
    <div className="grid grid-flow-col gap-4">
     <div className="flex gap-2">
     <img className="h-8" src="images/flag.JPG" alt="" srcset="" />
     <p className="text-[#81849e] font-semibold">United State (English)</p>
     </div>
    </div>
  </nav>
</footer>
<footer className="footer bg-[#0f0f0e] footer-center  text-base-content p-4">
  <aside>
    <p>EEVE © {new Date().getFullYear()} - All right reserved.</p>
  </aside>
</footer>

      </div>
        </div>
    );
};

export default Footer;