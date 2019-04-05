<template>
  <div id="app" class="register-panel">
    <div class="Register G_Form">
      <div class="reg-header">
        <router-link
          :to="{name:'Home'}"
          class="el-icon-close router-link-active"
          id="G-Login-return"
        ></router-link>
        <h2 style="font-size: 18px;line-height:40px;">{{$t("reg.register")}}</h2><!--快速注册 -->
      </div>
      <div class="el-row">
        <form class="el-form el-form--label-right" style="margin-top: 10px;">
          <div class="line-w"></div>
          <div class="el-form-item">
            <!---->
            <div class="el-form-item__content">
              <div class="el-input el-input--prefix">
                <input
                  autocomplete="off"
                  :placeholder="$t('reg.userName')"
                  v-model="vm.username"
                  ref="username"
                  maxlength="16"
                  minlength="6"
                  type="text"
                  rows="2"
                  validateevent="true"
                  class="el-input__inner"
                ><!-- 用户名-->
                <span class="el-input__prefix">
                  <i class="ivu-icon ivu-icon-ios-person-outline"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="line-w"></div>
          <div class="el-form-item">
            <div class="el-form-item__content">
              <div class="el-input el-input--prefix">

                <input
                  autocomplete="off"
                  :placeholder="$t('reg.pwd')"
                  v-model="vm.password"
                  ref="password"
                  maxlength="12"
                  minlength="6"
                  type="password"
                  rows="2"
                  validateevent="true"
                  class="el-input__inner"
                ><!--密码 -->
                <span class="el-input__prefix">
                  <i class="ivu-icon ivu-icon-ios-lock-outline"></i>
                  <!---->
                </span>
                <!---->
                <!---->
              </div>
              <!---->
            </div>
          </div>
          <div class="line-w"></div>
          <div class="el-form-item">
            <!---->
            <div class="el-form-item__content">
              <div class="el-input el-input--prefix">
                <!---->
                <input
                  autocomplete="off"
                  :placeholder="$t('reg.confirmPwd')"
                  v-model="vm.truePassword"
                  ref="truePassword"
                  maxlength="12"
                  minlength="6"
                  type="password"
                  rows="2"
                  validateevent="true"
                  class="el-input__inner"
                ><!--确认密码 -->
                <span class="el-input__prefix">
                  <i class="ivu-icon ivu-icon-ios-lock-outline"></i>
                  <!---->
                </span>
                <!---->
                <!---->
              </div>
              <!---->
            </div>
          </div>
          <div class="el-form-item">
            <!---->
            <div class="el-form-item__content">
              <div class="el-input el-input--prefix">
                <!---->
                <input
                  autocomplete="off"
                  :placeholder="$t('reg.phone')"
                  v-model="vm.mobile"
                  ref="mobile"
                  maxlength="11"
                  minlength="11"
                  type="text"
                  validateevent="true"
                  class="el-input__inner"
                ><!-- 手机号码-->
                <span class="el-input__prefix">
                  <Icon type="ios-call"/>
                  <!---->
                </span>
                <!---->
                <!---->
              </div>
              <!---->
            </div>
          </div>
          <div class="line-w"></div>
          <div class="el-form-item">
            <!---->
            <div class="el-form-item__content">
              <div class="el-input el-input--prefix">
                <!---->
                <input
                  autocomplete="off"
                  :placeholder="$t('reg.code')"
                  v-model="vm.checkcode"
                  ref="checkcode"
                  maxlength="4"
                  type="text"
                  rows="2"
                  validateevent="true"
                  class="el-input__inner"
                ><!--验证码 -->
                <span class="el-input__prefix">
                  <i class="ivu-icon ivu-icon-ios-glasses-outline"></i>
                  <!---->
                </span>
                <!---->
                <!---->
              </div>
              <img :src="cgetCodeUrl" @click="mVCode()" id="ImgCode" class="ImgCode">
              <!---->
            </div>
          </div>
          <div class="el-form-item">{{cgetCodeUrl}}</div>
          <div class="line-w"></div>
          <div class="el-form-item">
            <!---->
            <!-- <div class="el-form-item__content">
              <div role="group" aria-label="checkbox-group" class="el-checkbox-group">
                <label role="checkbox" aria-checked="true" class="el-checkbox is-checked">
                  <span aria-checked="mixed" class="el-checkbox__input is-checked">
                    <span class="el-checkbox__inner"></span>
                    <input
                      type="checkbox"
                      name="type"
                      class="el-checkbox__original"
                      value="我已届满合法博彩年龄,且同意各项"
                    >
                  </span>
                  <span class="el-checkbox__label">我已届满合法博彩年龄,且同意各项</span>
                </label>
                <b
                  href="javascript:void (0)"
                  class="A-registered-link"
                  style="color: #c8a675; font-size: 12px; padding-left: 5px;"
                >&quot;开户协议&quot;</b>
              </div>
            </div>-->
          </div>
        </form>
        <button
          type="button"
          class="el-button G-submit el-button--primary el-button--default"
          @click="mSave"
        >
          <span>{{$t('reg.next')}}</span><!--下一步 -->
        </button>
      </div>
      <!--<div class="A-Register-box" style="display: none;">-->
        <!--<div class="A-Register-content">-->
          <!--<h2 class="A-Register-R-title">-->
            <!--通用条款-->
            <!--<span class="A-Register-drop iconfont icon-cuo"></span>&lt;!&ndash; 通用条款&ndash;&gt;-->
          <!--</h2>-->
          <!--<div class="A-Register-wrapper">-->
            <!--<h2-->
              <!--style="font-size: 14px; text-align: left; font-weight: 600; line-height: 20px; color: rgb(93, 91, 91);"-->
            <!--&gt;一、基本条款</h2>&lt;!&ndash; 一、基本条款&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;1. 为避免于本网站投注时之争议，请会员务必于进入网站前详阅本娱乐场所定之各项规则，客户一经“我同意”进入本网站进行投注时，即被视为已接受本娱乐场的所有协议与规则；</p>&lt;!&ndash;1. 为避免于本网站投注时之争议，请会员务必于进入网站前详阅本娱乐场所定之各项规则，客户一经“我同意”进入本网站进行投注时，即被视为已接受本娱乐场的所有协议与规则； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;2. 会员有责任确保自己的帐户以及登入资料的保密性，以会员帐号及密码进行的任何网上投注，将被视为有效；敬请不定时做密码变更之动作；若帐号密码被盗用，进行的投注，本公司一概不负赔偿责任；</p>&lt;!&ndash;2. 会员有责任确保自己的帐户以及登入资料的保密性，以会员帐号及密码进行的任何网上投注，将被视为有效；敬请不定时做密码变更之动作；若帐号密码被盗用，进行的投注，本公司一概不负赔偿责任； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;3. 本公司保留不定时更改本协定或游戏规则或保密条例，更改之条款将从更改发生后指定之日起生效，并保留一切有争议事项及最后的决策权；</p>&lt;!&ndash;3. 本公司保留不定时更改本协定或游戏规则或保密条例，更改之条款将从更改发生后指定之日起生效，并保留一切有争议事项及最后的决策权； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">4. 用户须达到居住地国家法律规定之合法年龄方可使用线上娱乐场或网站；</p>&lt;!&ndash; 4. 用户须达到居住地国家法律规定之合法年龄方可使用线上娱乐场或网站；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">5. 网上投注如未能成功提交，投注将被视为无效；</p>&lt;!&ndash;5. 网上投注如未能成功提交，投注将被视为无效； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">6. 凡玩家于出牌途中且尚无结果前自动或强制断线时，并不影响比赛之结果；</p>&lt;!&ndash; 6. 凡玩家于出牌途中且尚无结果前自动或强制断线时，并不影响比赛之结果；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">7. 如遇发生不可抗拒之灾害，骇客入侵，网络问题造成数据丢失的情况，以本公司公告为最终方案；</p>&lt;!&ndash; 7. 如遇发生不可抗拒之灾害，骇客入侵，网络问题造成数据丢失的情况，以本公司公告为最终方案；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">8. 特此声明，本公司将会对所有的电子交易进行记录，如有任何争议，本公司将会以注单记录为准；</p>&lt;!&ndash;8. 特此声明，本公司将会对所有的电子交易进行记录，如有任何争议，本公司将会以注单记录为准； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">9. 本公司保留更改、修改现有条款或增加任何适当条款的权利，而条款改动后将会在会员端跑马灯上公布；</p>&lt;!&ndash; 9. 本公司保留更改、修改现有条款或增加任何适当条款的权利，而条款改动后将会在会员端跑马灯上公布；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">10. 无论在任何情况下，本公司具有最终的解释权；</p>&lt;!&ndash; 10. 无论在任何情况下，本公司具有最终的解释权；&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;11. 若经本公司发现会员以不正当手法&lt;利用外挂程式&gt;进行投注或以任何非正常方式进行的个人、团体投注有损公司利益之投注事情发生，本公司保留权利取消该类注单以及注单产生之红利，并停用该会员帐号；</p>&lt;!&ndash;11. 若经本公司发现会员以不正当手法&lt;利用外挂程式&gt;进行投注或以任何非正常方式进行的个人、团体投注有损公司利益之投注事情发生，本公司保留权利取消该类注单以及注单产生之红利，并停用该会员帐号； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;12. 无风险投注包括在百家乐同时投注的庄闲，单双，大小；龙虎斗中同时投注龙虎，龙双龙单，虎双虎单；在轮盘同时投注黑红，单双，大小等相反的下注，本公司保留权利取消所有优惠、该注单以及单注产生之红利，并停用该会员账号之权利，本公司不承担对此做出任何说明及解释之责任；-->
              <!--<br>若本公司发现会员有重复申请帐号行为时，保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利；每位玩家、每一电子邮箱、每一电话号码、每一收款银行账号，以及共享电脑环境(例如:网吧、其他公共用电脑等)只能够拥有一个会员帐号，各项优惠只适用于每位客户在本公司唯一的帐户。-->
              <!--<br>所有皇冠的优惠是特别为玩家而设，在玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，皇冠保留权利要求客户向我们提供充足有效的文件， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。-->
              <!--<br>皇冠赌场是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在皇冠注册、下注，为会员个人行为，皇冠不负责、承担任何相关责任。-->
              <!--<br>无论是个人或是团体，如有任何威胁、滥用皇冠优惠的行为，皇冠保留杈利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。-->
              <!--<br>客户一经注册开户，将被视为接受所有颁布在皇冠网站上的规则与条例。-->
            <!--</p>&lt;!&ndash; 12. 无风险投注包括在百家乐同时投注的庄闲，单双，大小；龙虎斗中同时投注龙虎，龙双龙单，虎双虎单；在轮盘同时投注黑红，单双，大小等相反的下注，本公司保留权利取消所有优惠、该注单以及单注产生之红利，并停用该会员账号之权利，本公司不承担对此做出任何说明及解释之责任；-->
              <!--<br>若本公司发现会员有重复申请帐号行为时，保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利；每位玩家、每一电子邮箱、每一电话号码、每一收款银行账号，以及共享电脑环境(例如:网吧、其他公共用电脑等)只能够拥有一个会员帐号，各项优惠只适用于每位客户在本公司唯一的帐户。-->
              <!--<br>所有皇冠的优惠是特别为玩家而设，在玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，皇冠保留权利要求客户向我们提供充足有效的文件， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。-->
              <!--<br>皇冠赌场是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在皇冠注册、下注，为会员个人行为，皇冠不负责、承担任何相关责任。-->
              <!--<br>无论是个人或是团体，如有任何威胁、滥用皇冠优惠的行为，皇冠保留杈利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。-->
              <!--<br>客户一经注册开户，将被视为接受所有颁布在皇冠网站上的规则与条例。&ndash;&gt;-->
            <!--<h2-->
              <!--style="font-size: 14px; text-align: left; font-weight: 600; line-height: 20px;"-->
            <!--&gt;二、真人娱乐条款</h2>&lt;!&ndash;二、真人娱乐条款 &ndash;&gt;-->
            <!--<p class="A-Register-R-text">1. 当您下注后，请等待显示“您共下注XXXX元”，这个讯息在中间的讯息窗口可以看见；</p>&lt;!&ndash; 1. 当您下注后，请等待显示“您共下注XXXX元”，这个讯息在中间的讯息窗口可以看见；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">2. 开牌后，若您已有下注，请确认您的输赢金额，这个讯息在中间的讯息窗口可以看见；</p>&lt;!&ndash;2. 开牌后，若您已有下注，请确认您的输赢金额，这个讯息在中间的讯息窗口可以看见； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">3. 您的“总下注金额”及“赢得金额”亦会每局显示于右上角的视窗中，请会员详加确认；</p>&lt;!&ndash;3. 您的“总下注金额”及“赢得金额”亦会每局显示于右上角的视窗中，请会员详加确认； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;4. 当会员在游戏中途发生网路问题而断线，所有已被确定的投注仍然有效；会员再重新登入时，就可以查询游戏端内的“下注记录”查询发牌结果，会员的额度也会随着当局的输赢增加或减少；</p>&lt;!&ndash;4. 当会员在游戏中途发生网路问题而断线，所有已被确定的投注仍然有效；会员再重新登入时，就可以查询游戏端内的“下注记录”查询发牌结果，会员的额度也会随着当局的输赢增加或减少； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;5. 如果您在讯息窗口看到“开牌”的话，而您的游戏画面未显示投注金额，这代表该局您的投注不成功，这有可能下注的时间太迟或是因为网路问题而没有被系统接受；</p>&lt;!&ndash; 5. 如果您在讯息窗口看到“开牌”的话，而您的游戏画面未显示投注金额，这代表该局您的投注不成功，这有可能下注的时间太迟或是因为网路问题而没有被系统接受；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">6. 百家乐游戏在本网内设计为每手牌局前不销牌；</p>&lt;!&ndash;6. 百家乐游戏在本网内设计为每手牌局前不销牌； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;7. 当会员进入游戏，超过5局没下注会有提示；若您连续10局未下注的时候将会被游戏弹出至首页，请会员重新登入；若会员于下注开牌期间强行登出，帐号将被系统锁住三分钟，请会员稍后再重新登入；</p>&lt;!&ndash;7. 当会员进入游戏，超过5局没下注会有提示；若您连续10局未下注的时候将会被游戏弹出至首页，请会员重新登入；若会员于下注开牌期间强行登出，帐号将被系统锁住三分钟，请会员稍后再重新登入； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;8. 本网上游戏是在现场把牌通过扫描后将牌例显示在会员端荧幕上，故若牌没扫描到必将重新扫描一遍，若还是没有感应则把牌翻开由现场公务输入牌卡数码，牌例便会显示在会员端荧幕上；</p>&lt;!&ndash; 8. 本网上游戏是在现场把牌通过扫描后将牌例显示在会员端荧幕上，故若牌没扫描到必将重新扫描一遍，若还是没有感应则把牌翻开由现场公务输入牌卡数码，牌例便会显示在会员端荧幕上；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">9. 当荷官不小心同时从牌靴中抽出两张牌，而扫描到的不是按顺序正确的那张牌：-->
              <!--<br>（a）若牌局已开牌，而结果不符，系统将根据现况决定牌的先后摆放顺序之开牌结果进行手动开牌，并换上新牌靴开始新局；-->
              <!--<br>（b）若牌局未开牌，则由现场公务决定牌的先后摆放顺序，牌局会如常继续;-->
            <!--</p>&lt;!&ndash; 9. 当荷官不小心同时从牌靴中抽出两张牌，而扫描到的不是按顺序正确的那张牌：-->
            <!--（a）若牌局已开牌，而结果不符，系统将根据现况决定牌的先后摆放顺序之开牌结果进行手动开牌，并换上新牌靴开始新局；-->
            <!--（b）若牌局未开牌，则由现场公务决定牌的先后摆放顺序，牌局会如常继续;-->
            <!--&ndash;&gt;-->
            <!--<p class="A-Register-R-text">10. 在洗牌或将牌放入牌靴过程中，有牌不慎曝光，荷官会把牌叠起并重新洗牌，牌局将重新开始；</p>&lt;!&ndash; 10. 在洗牌或将牌放入牌靴过程中，有牌不慎曝光，荷官会把牌叠起并重新洗牌，牌局将重新开始；&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;11. 牌局进行中，未扬牌前(该张牌未于视讯显示点数花色前)，牌不慎离开台面，牌丢落地上，或离开视讯范围，则该牌局予以注销作废，所有下注本金退回；</p>&lt;!&ndash; 11. 牌局进行中，未扬牌前(该张牌未于视讯显示点数花色前)，牌不慎离开台面，牌丢落地上，或离开视讯范围，则该牌局予以注销作废，所有下注本金退回；&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;12. 若该牌已经过扫描且已扬牌后，该牌不慎离开台面，牌丢落地上，或离开视讯范围，因其不影响游戏之正确结果，牌由现场工务摆回后，该牌局正常行其结果仍视为有效；</p>&lt;!&ndash; 12. 若该牌已经过扫描且已扬牌后，该牌不慎离开台面，牌丢落地上，或离开视讯范围，因其不影响游戏之正确结果，牌由现场工务摆回后，该牌局正常行其结果仍视为有效；&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;13. 派错牌例（已不须补牌，荷官仍补牌）现场工务会把多补的那张牌放到牌靴底，牌局结果依视讯显示为准，牌局将如常进行；若该张多补的牌已亮开，公务将在做完以上同样程序后换上新牌靴，牌局会重新开始；</p>&lt;!&ndash;-->
             <!--13. 派错牌例（已不须补牌，荷官仍补牌）现场工务会把多补的那张牌放到牌靴底，牌局结果依视讯显示为准，牌局将如常进行；若该张多补的牌已亮开，公务将在做完以上同样程序后换上新牌靴，牌局会重新开始；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">14. 荷官未依闲、庄发牌正确顺序将牌放错位置，由工务将牌依正确顺序摆放回位置后牌局将照常继续；</p>&lt;!&ndash; 14. 荷官未依闲、庄发牌正确顺序将牌放错位置，由工务将牌依正确顺序摆放回位置后牌局将照常继续；&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;15. 开牌过程中，牌有感应但无显示，荷官已亮牌（如:已派出数张牌，但第一张牌有感应但未显示，至第二、三张牌显示在错误的闲、庄位置上），现场工务会依牌的正确次序输入代码，牌局将如常继续;</p>-->
            <!--&lt;!&ndash;15. 开牌过程中，牌有感应但无显示，荷官已亮牌（如:已派出数张牌，但第一张牌有感应但未显示，至第二、三张牌显示在错误的闲、庄位置上），现场工务会依牌的正确次序输入代码，牌局将如常继续;-->
            <!--16. 同一张牌，扫描了一次出现2张（闲、庄位置各一张）&ndash;&gt;-->
            <!--<p class="A-Register-R-text">16. 同一张牌，扫描了一次出现2张（闲、庄位置各一张）-->
              <!--<br>（a）若牌局已开牌，而结果不符，系统将根据视讯荷官完成该局之正确结果进行手动开牌，牌局也将在牌路无误的情况下如常继续；-->
              <!--<br>（b）若牌局未开牌，荷官避开扫描如常开牌后，工务将输入牌之正确数码，并修正不符那张牌的花色、点数，牌局会如常继续；-->
            <!--</p>&lt;!&ndash;-->
            <!--（a）若牌局已开牌，而结果不符，系统将根据视讯荷官完成该局之正确结果进行手动开牌，牌局也将在牌路无误的情况下如常继续；-->
            <!--（b）若牌局未开牌，荷官避开扫描如常开牌后，工务将输入牌之正确数码，并修正不符那张牌的花色、点数，牌局会如常继续；-->
            <!--&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;17. 电脑、扫描器出现异常、牌局中断、牌无法扫描又无法输入牌卡数码时，那一个牌局便会作废，所有程式将被关闭，并重开程式，牌局将重新开始；但若荷官发牌视讯已有结果，则以视讯开牌为主，会由系统完成开配；</p>&lt;!&ndash;17. 电脑、扫描器出现异常、牌局中断、牌无法扫描又无法输入牌卡数码时，那一个牌局便会作废，所有程式将被关闭，并重开程式，牌局将重新开始；但若荷官发牌视讯已有结果，则以视讯开牌为主，会由系统完成开配； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">18. 有关例行性维护、网路问题、视讯中断、牌局作废、注销情况等事宜，皆可于会员端左上角处公告栏上得知最新讯息；</p>&lt;!&ndash;18. 有关例行性维护、网路问题、视讯中断、牌局作废、注销情况等事宜，皆可于会员端左上角处公告栏上得知最新讯息； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">19. 发牌视讯仅保留三日，若有异议请于游戏当日起三日内提出，三日后恕不受理；</p>&lt;!&ndash;19. 发牌视讯仅保留三日，若有异议请于游戏当日起三日内提出，三日后恕不受理； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">20. 本娱乐场之视讯为真人直播，故该局游戏若因国际线路传输问题出现争议，将以视讯看到牌局结果决定输赢；</p>&lt;!&ndash;20. 本娱乐场之视讯为真人直播，故该局游戏若因国际线路传输问题出现争议，将以视讯看到牌局结果决定输赢； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;21. 本娱乐场所提供之牌路仅供参考，若因国际线路问题或其他因素造成牌路显示有误，所有游戏结果将以视讯开牌及游戏记录为主；</p>&lt;!&ndash;21. 本娱乐场所提供之牌路仅供参考，若因国际线路问题或其他因素造成牌路显示有误，所有游戏结果将以视讯开牌及游戏记录为主； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">22. 本公司保留一切有争议事项的修正及最后的决策；</p>&lt;!&ndash; 22. 本公司保留一切有争议事项的修正及最后的决策；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">23. 本娱乐场保留随时更改、修订或删除游戏、游戏规则（包括机率及赔率）及协议条款的权利而无须作事先通知；</p>&lt;!&ndash; 23. 本娱乐场保留随时更改、修订或删除游戏、游戏规则（包括机率及赔率）及协议条款的权利而无须作事先通知；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">24. 本娱乐场保留随时修订、撤销或中止任何投注的权利而无须作事先通知，亦无须作任何解释；</p>&lt;!&ndash;24. 本娱乐场保留随时修订、撤销或中止任何投注的权利而无须作事先通知，亦无须作任何解释； &ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;25. 本娱乐场记录每一项于本网站伺服器内执行的交易及投注功能；若会员认为向本娱乐场提供的资料与本网站资料库中的资料记录之间出现了任何声称的差异，一切均以本网站资料库的资料为准；</p>-->
            <!--&lt;!&ndash; 25. 本娱乐场记录每一项于本网站伺服器内执行的交易及投注功能；若会员认为向本娱乐场提供的资料与本网站资料库中的资料记录之间出现了任何声称的差异，一切均以本网站资料库的资料为准；&ndash;&gt;-->
            <!--<p-->
              <!--class="A-Register-R-text"-->
            <!--&gt;26. 当会员已于本娱乐场之游戏厅内下注，而电脑出现连线异常导致牌局中断时，会员最后押住仍视为有效，本娱乐场将以会员于本网站资料库的交易记录为准；</p>&lt;!&ndash;26. 当会员已于本娱乐场之游戏厅内下注，而电脑出现连线异常导致牌局中断时，会员最后押住仍视为有效，本娱乐场将以会员于本网站资料库的交易记录为准； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">27. 会员在本娱乐场之游戏厅内任何游戏的押注记录均视为有效，会员需自行承担下注后的风险；-->
              <!--<br>若经本公司发现会员以不正当手法&lt;利用外挂程式&gt;进行投注或以任何非正常方式进行的个人、团体投注有损公司利益之投注事情发生，本公司保留取消该类注单之权利。-->
            <!--</p>&lt;!&ndash; 27. 会员在本娱乐场之游戏厅内任何游戏的押注记录均视为有效，会员需自行承担下注后的风险；-->
            <!--若经本公司发现会员以不正当手法&lt;利用外挂程式&gt;进行投注或以任何非正常方式进行的个人、团体投注有损公司利益之投注事情发生，本公司保留取消该类注单之权利。 &ndash;&gt;-->
            <!--<h2-->
              <!--style="font-size: 14px; text-align: left; font-weight: 600; line-height: 20px;"-->
            <!--&gt;三、彩票类游戏</h2>&lt;!&ndash;三、彩票类游戏 &ndash;&gt;-->
            <!--<p class="A-Register-R-text">1. 当您在下注之后，请等待显示“下注成功”资讯；</p>&lt;!&ndash; 1. 当您在下注之后，请等待显示“下注成功”资讯；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">2. 为了避免出现争论，您必须在下注之后检查“下注状况”；</p>&lt;!&ndash;2. 为了避免出现争论，您必须在下注之后检查“下注状况”； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">3. 任何的投诉必须在开彩之前提出，本公司不会受理任何开彩之后的投诉；</p>&lt;!&ndash;3. 任何的投诉必须在开彩之前提出，本公司不会受理任何开彩之后的投诉； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">4. 所有投注项目，公布赔率时出现的任何打字错误或非故意人为失误，本公司保留改正错误和按正确赔率结算投注的权力；</p>&lt;!&ndash; 4. 所有投注项目，公布赔率时出现的任何打字错误或非故意人为失误，本公司保留改正错误和按正确赔率结算投注的权力；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">5. 开彩后的投注，将被视为“无效”；所有赔率将不时浮动，派彩时的赔率将以确认投注时之赔率为准；</p>&lt;!&ndash;5. 开彩后的投注，将被视为“无效”；所有赔率将不时浮动，派彩时的赔率将以确认投注时之赔率为准； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">6. 所有赛果以官方网站公布的结果为依据，若因官网延迟、错误或取消；本公司保留对已下注注单的裁决权；</p>&lt;!&ndash;6. 所有赛果以官方网站公布的结果为依据，若因官网延迟、错误或取消；本公司保留对已下注注单的裁决权； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">7. 若发生两颗球同时吸起，将依照在结果区之号码球为主；</p>&lt;!&ndash;7. 若发生两颗球同时吸起，将依照在结果区之号码球为主； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">8. 在游戏尚未完成开配之前，若因机器问题而导致有结果产生，该局将一律注销；</p>&lt;!&ndash;8. 在游戏尚未完成开配之前，若因机器问题而导致有结果产生，该局将一律注销； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">9. 在下注时间尚未结束之前，若因任何因素导致有结果产生，该局将一律注销；</p>&lt;!&ndash; 9. 在下注时间尚未结束之前，若因任何因素导致有结果产生，该局将一律注销；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">10. 若该局己有结果但与实际结果不符，系统将根据视讯完成该局之正确结果进行手动开牌；</p>&lt;!&ndash;10. 若该局己有结果但与实际结果不符，系统将根据视讯完成该局之正确结果进行手动开牌； &ndash;&gt;-->
            <!--<h2 style="font-size: 14px; text-align: left; font-weight: 600; line-height: 20px;"-->
            <!--&gt;四、电子游艺</h2>&lt;!&ndash;四、电子游艺 &ndash;&gt;-->
            <!--<p class="A-Register-R-text">1. 电子游戏中奖画面与派彩结果不符时，本公司将以资料库最终结果为依据；</p>&lt;!&ndash;1. 电子游戏中奖画面与派彩结果不符时，本公司将以资料库最终结果为依据； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">2. 彩池金额是以满注中奖结果显示，玩家中奖系以押注比例分配彩池金额；</p>&lt;!&ndash;2. 彩池金额是以满注中奖结果显示，玩家中奖系以押注比例分配彩池金额； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">3. 老虎机游戏过程中如遇断线情况将以资料库最终结果为依据，本公司保留对已下注注单的裁决权；</p>&lt;!&ndash;3. 老虎机游戏过程中如遇断线情况将以资料库最终结果为依据，本公司保留对已下注注单的裁决权； &ndash;&gt;-->
            <!--<p class="A-Register-R-text">4. 21点游戏补牌中如遇玩家断线，则视玩家为不补牌；游戏结果将视为有效；</p>&lt;!&ndash; 4. 21点游戏补牌中如遇玩家断线，则视玩家为不补牌；游戏结果将视为有效；&ndash;&gt;-->
            <!--<p class="A-Register-R-text">5. 红狗游戏过程中如遇断线情况将视为玩家不加注进行补牌，完成该局游戏结果。</p>&lt;!&ndash;5. 红狗游戏过程中如遇断线情况将视为玩家不加注进行补牌，完成该局游戏结果。 &ndash;&gt;-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!---->
    </div>
  </div>
</template>
<script>
import types from '@/store/mutation-types'
var _this;
export default {
  name: "Reg",
  data: () => ({
    vm: {
      sysId: "",
      username: "",
      password: "",
      truePassword: "",
      checkcode: "",
      mobile: ""
    },
    random: 0,
    vcodeurl: ""
  }),
  computed: {
    cgetCodeUrl() {
       return this.$store.getters.getBaseUrl + '/checkCode.json?t='+this.random+'&token='+
          this.$store.getters.getSessionToken
       },
   },
  methods: {
    mVCode() {
      this.vm.checkcode = "";
       this.random = Math.random();
    },
    mSave() {
      if (this.isLogining) return;
      if (!this.vm.username) {
          //账号必须！
        this.mAlert(this.$t('reg.mustAccount'), () => {
          this.$refs.username.focus();
        });
        return;
      }
      if (this.vm.username.length < 4 || this.vm.username.length > 12) {
          //账号长度为4-12位
        this.mAlert(this.$t('reg.must412'), () => {
          this.$refs.username.focus();
        });
        return;
      }
      if (!this.vm.password) {
          //密码必须！
        this.mAlert(this.$t('reg.mustpwd'), () => {
          this.$refs.password.focus();
        });
        return;
      }
      if (this.vm.password.length < 6) {
          //请输入6-12位密码！
        this.mAlert(this.$t('reg.must612'), () => {
          this.$refs.password.focus();
        });
        return;
      }
      if (this.vm.password != this.vm.truePassword) {
          //两次输入密码不一致！
        this.mAlert(this.$t('reg.mustSame'), () => {
          this.$refs.truePassword.focus();
        });
        return;
      }
      if (this.vm.mobile == "") {
          //手机号码不可为空！
        this.mAlert(this.$t('reg.phonenoempty'), () => {
          this.$refs.mobile.focus();
        });
        return;
      }
      // if (this.vm.mobile != "") {
      //   if (
      //     !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
      //       this.vm.mobile
      //     )
      //   ) {
      //     this.mAlert("请输入正确的手机号码格式", () => {
      //       this.$refs.mobile.focus();
      //     });
      //     return;
      //   }
      // }
      if (!this.vm.checkcode) {
          //验证码必须
        this.mAlert(this.$t('reg.mustcode'), () => {
          this.vm.checkcode = "";
          this.$refs.vcode.focus();
        });
        return;
      }
      this.isLogining = true;
      var params = {};
      params.sysId = this.vm.sysId;
      params.username = this.vm.username;
      params.password = this.vm.password;
      params.checkcode = this.vm.checkcode;
      params.mobile = this.vm.mobile;
      if (this.$route.query && this.$route.query.registerCode) {
        params.registerCode = this.$route.query.registerCode;
        sessionStorage.setItem("registerCode", params.registerCode);
      } else {
        let rc = sessionStorage.getItem("registerCode");
        if (rc) {
          params.registerCode = rc;
        }
      }
      if (this.$route.query && this.$route.query.lid) {
        params.lid = this.$route.query.lid;
        sessionStorage.setItem("lid", params.lid);
      } else {
        let rc = sessionStorage.getItem("lid");
        if (rc) {
          params.lid = rc;
        }
      }
      this.mLoading(true);
      this.$http.post("/memberUser/registerUser.json", params).then(result => {
        this.isLogining = false;
        this.mLoading(false);
        if (result.code == 0) {
            //恭喜，注册成功！
          this.mAlert(this.$t('reg.successRegister'), () => {
            this.mmLogin(params.username, params.password, params.checkcode)
              .then(result => {})
              .catch(result => {
                this.$router.push({
                  name: "Login"
                });
              });
          });
        } else {
          this.mVCode();
          this.mAlert(result.message, () => {});
        }
      });
    },
     mupnav(type,obj,baseUrl) {

               var listStr = localStorage.getItem(types.BASE_URL_LIST)
               if (!listStr || listStr == '[]') {
                       this.$store.commit(types.CHANGE_URL,"")
                       this.$store.dispatch(types.WEBNAV,{callback:this.mupnav,url:'',type:type})
                }else{
                    if(type ==  'getfasturl'){
                    if( obj != 2){
                    var list =  JSON.parse(listStr);
                    list.filter(i => {
                        this.$store.dispatch(types.WEBNAV,{callback:this.mupnav,url:i,type:type})
                        });
                     }
                     }
               }
      }
  },
  created() {
    this.mupnav('getfasturl')
    this.mVCode();
  }
};
</script>
<style scoped>
.Register .reg-header {
  height: 40px;
  line-height: 40px;
  font-size: 0.3rem;
  font-weight: 700;
  color: #fff;
  position: relative;
  background: #545478;
  border-bottom: 1px solid #3a3a3a;
}
.Register .reg-header #G-Login-return {
  position: absolute;
  font-size: 20px;
  left: 10px;
  top: 10px;
}
.HomeWrapper {
  /*background: #33334e;*/
}
.G_Form .el-form-item {
  margin: 0px 10px;
}
.el-input__inner {
  color:#000000;
  /*background-color: #434365 !important;*/
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #777;
}
A-registered-link {
  color: #c8a675;
  font-size: 12px;
  padding-left: 5px;
}
.A-registered-link :active .A-Register-box {
  display: inline;
}
.el-button--primary {
  background-color: #ffb301;
  border-color: #ffc501;
}
</style>



