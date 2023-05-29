import swal from 'sweetalert2';

export default function validateToken(router:any){

  const token: any = localStorage.getItem('TOKEN');
  if(token === null){
    swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor vuelva a iniciar sesión',
    });
    router.navigate(['/'])
  }else{
    function wt_decode(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    };

    const decode = wt_decode(token)
  
    let dateExp = new Date(decode.exp * 1000).toLocaleString();
    let date = new Date().toLocaleString()
    
    if (date > dateExp) {
      swal.fire({
        icon: 'info',
        title: 'Sesión expirada',
        text: 'Por favor vuelva a iniciar sesión',
      }).then(() => {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('DATA')
        router.navigate(['/'])
      })
    }
  }
}