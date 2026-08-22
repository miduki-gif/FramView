// const button = document.getElementById("Check");
//       button.addEventListener("click",myCheck);
// async function myCheck() {
//     console.log("click")
//     const inputValue = Array.from(document.querySelectorAll('[name="inputContents"]')).map(input => input.value);
//     const res = await fetch("/Check-api", {
//         //1.test-apiにPOSTで通信が届いているかを確認すべき
//         //2.データの中身が届いているかを確認する
//         method: "POST",
//         headers: {
//             "Content-Type": 'application/json',
//             "Accept": 'application/json',
//             //fetchでリクエストを送信する際に、正規の画面から送られたリクエストであることを
//             //サーバーへ証明するためのものが、'X-CSRF-TOKEN'
//             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
//         },
//         body: JSON.stringify({ message: inputValue })
//     });
//     const resdata = await res.json();
//     console.log(resdata);
//     resdata.result.forEach(element => {
//         const p = document.createElement("p");
//         p.textContent = `[${element.category}] ${element.question}`;
//         question.appendChild(p);
//     });
// }