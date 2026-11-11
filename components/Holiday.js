// Holiday banners that turn on by themselves every year (Arizona time, no redeploy needed).
// A tiny inline script adds a class such as "hol-veterans" to <html> before the page paints;
// CSS shows only the matching banner, so there is no layout jump. Preview with ?holiday=veterans.
//   veterans  Veterans Day, November 11
const SCRIPT = `(function(){try{var q=(location.search.match(/[?&]holiday=([a-z]+)/)||[])[1];
var d=new Date(Date.now()-7*36e5),m=d.getUTCMonth()+1,n=d.getUTCDate(),t=q||(m===11&&n===11?'veterans':'');
if(t)document.documentElement.classList.add('hol-'+t)}catch(e){}})();`;

export default function HolidayBanner() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
      <div className="hol-banner hol-banner--veterans" role="note">
        <span aria-hidden="true">🇺🇸</span>
        <p><b>Happy Veterans Day!</b> Thank you to every veteran for your service and sacrifice, from the members of BNI A1 Networkers.</p>
        <span aria-hidden="true">🎖️</span>
      </div>
    </>
  );
}
