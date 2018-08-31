!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("axios"),require("sip.js"),require("reconnecting-websocket")):"function"==typeof define&&define.amd?define(["axios","sip.js","reconnecting-websocket"],e):t["@wazo/sdk"]=e(t.axios,t.SIP,t.ReconnectingWebSocket)}(this,function(t,e,a){"use strict";t=t&&t.hasOwnProperty("default")?t.default:t,e=e&&e.hasOwnProperty("default")?e.default:e,a=a&&a.hasOwnProperty("default")?a.default:a;var n={server:null,token:null};var s=e=>{const a=`https://${n.server}/api/auth/0.1/token`,s={backend:e.backend||"wazo_user",expiration:e.expiration||3600},o={auth:{username:e.username,password:e.password}};t.post(a,s,o).then(t=>((t,e)=>{n.data=t.data.data,e&&e(n.data)})(t,e.callback))};var o=e=>{if(n.token){const a=`https://${n.server}/api/auth/0.1/token/${n.token}`;t.delete(a).then((t=>{n.token=null,t&&t(n.token)})(e.callback))}};const i=(t,e)=>{n.data=t.data,404===t&&(n.data={error:"Token is not found"}),204===t&&(n.data={message:"Token is found"}),e&&e(n.data)};const c=["STATUS_NULL","STATUS_NEW","STATUS_CONNECTING","STATUS_CONNECTED","STATUS_COMPLETED"];return{client:class{constructor(t){this.logIn=s,this.logOut=o,this.server=t}},init:t=>{n.server=t.server},logIn:s,logOut:o,checkToken:e=>{const a=`https://${n.server}/api/auth/0.1/token/${e.token}`;t.head(a,{validateStatus:t=>{i(t,e.callback)}}).then(t=>i(t,e.callback)).catch(t=>i(t,e.callback))},calls:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/calls`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.get(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},hangupCall:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/calls/${e.callID}`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.delete(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},answerCall:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/nodes`,s={calls:[{id:e.callID}]},o={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.post(a,s,o).then(s=>{const i=s.data.uuid,c={context:e.context,exten:e.exten,autoanswer:e.autoanswer};t.post(`${a}/${i}/calls`,c,o).then(t=>{((t,e,a)=>{n.data=t.data,n.data.node_uuid=e,a&&a(n.data)})(t,i,e.callback)})})},listNodes:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/nodes`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.get(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},removeNode:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/nodes/${e.nodeUuid}`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.delete(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},listCallsNodes:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/nodes/${e.nodeUuid}`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.get(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},removeCallNodes:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/nodes/${e.nodeUuid}/calls/${e.callID}`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.delete(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},addCallNodes:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/nodes/${e.nodeUuid}/calls/${e.callID}`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.put(a,null,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},addNewCallNodes:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/nodes/${e.nodeUuid}/calls`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}},o={context:e.context,exten:e.exten,autoanswer:e.autoanswer};t.post(a,o,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},playCall:e=>{const a=`https://${n.server}/api/ctid-ng/1.0/applications/${e.applicationUuid}/calls/${e.callID}/play`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}},o={language:e.language,uri:e.uri};t.post(a,o,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},listUsers:e=>{const a=`https://${n.server}/api/confd/1.1/users`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.get(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},getUser:e=>{const a=`https://${n.server}/api/confd/1.1/users/${e.user_uuid}`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.get(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},getUserLineSip:e=>{const a=`https://${n.server}/api/confd/1.1/users/${e.user_uuid}/lines/${e.line_id}/associated/endpoints/sip`,s={headers:{"X-Auth-Token":e.token,"Content-Type":"application/json"}};t.get(a,s).then(t=>((t,e)=>{n.data=t.data,e&&e(n.data)})(t,e.callback))},WebRTCPhone:class{constructor(t,e){this.config=t,this.ua=this.configureUa(),this.callback=e}configureUa(){const t=new e.Web.Simple(this.getConfig());return t.on("registered",()=>{this.callback("phone-events-registered")}),t.on("unregistered",()=>{this.callback("phone-events-unregistered")}),t.on("new",t=>{const e={callerid:function(t){return{caller_id_name:t.remoteIdentity.displayName,caller_id_number:t.remoteIdentity.uri.user}}(t),autoanswer:function(t){return!!t.getHeader("alert-info")}(t.request)};this.callback("phone-events-new",e)}),t.on("ringing",()=>{this.callback("phone-events-ringing")}),t.on("connected",()=>{this.callback("phone-events-connected")}),t.on("ended",()=>{this.callback("phone-events-ended")}),t}getConfig(){return{media:{remote:{audio:this.config.media.audio}},ua:{traceSip:!1,displayName:this.config.displayName,uri:this.config.uri,wsServers:this.config.wsServers,authorizationUser:this.config.authorizationUser,password:this.config.password,sessionDescriptionHandlerFactoryOptions:{peerConnectionOptions:{iceCheckingTimeout:500,rtcpMuxPolicy:"negotiate",rtcConfiguration:{iceServers:{urls:["stun:stun.l.google.com:19302","stun:stun1.l.google.com:19302"]}}}}}}}getState(){return c[this.ua.state]}call(t){/^\+?[0-9#*]+$/.exec(t)&&this.ua.call(t)}answer(){this.ua.answer()}reject(){this.ua.reject()}hangup(){this.ua.hangup()}close(){this.ua.ua.transport.disconnect()}},WazoWebSocket:class{constructor(t){this.ws_init=!1,this.callback=t.callback,this.host=t.host,this.token=t.token,this.events=t.events}init(){const t=new a(`wss://${this.host}/api/websocketd/?token=${this.token}`);return t.debug=!1,t.onmessage=(e=>{const a=JSON.parse(e.data);this.ws_init?this.callback(a):this.initialize(a,t)}),t.onclose=(t=>{t.code}),t}initialize(t,e){switch(t.op){case"init":for(let t=0;t<this.events.length;t+=1){const a={op:"subscribe",data:{event_name:this.events[t]}};e.send(JSON.stringify(a))}e.send(JSON.stringify({op:"start"}));break;case"subscribe":break;case"start":this.ws_init=!0}}}}});
