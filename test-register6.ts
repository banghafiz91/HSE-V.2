async function test() {
  const url = "https://script.google.com/macros/s/AKfycbxpybFgr2LVDRjOsoShd7_UElhmDgmTU3GrYqTEJioDYNDDiOZyUbluULereSE3SK-9/exec";
  const num = Date.now();
  const mail = `test_${num}@test.com`;
  const expDate = new Date(); expDate.setFullYear(expDate.getFullYear() + 1);
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
          action: "register",
          email: mail,
          password: "mysecurepassword123",
          nama: "Elhafizh",
          username: "Elhafizh",
          whatsapp: "628999111222",
          expired_date: expDate.toISOString()
      })
    });
    console.log("Register Result:", await res.text());
    
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
          action: "login",
          email: mail,
          password: "mysecurepassword123"
      })
    });
    console.log("Login Result:", await res.text());
  } catch(e) {
    console.error(e);
  }
}
test();
