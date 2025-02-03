"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakaoController = void 0;
const common_1 = require("@nestjs/common");
const kakao_service_1 = require("./kakao.service");
let KakaoController = class KakaoController {
    constructor(kakaoService) {
        this.kakaoService = kakaoService;
    }
    Chatbot(body, req, res) {
        const method = req.get('method');
        const user_id = body.userRequest?.user?.id;
        const user_input = body.userRequest?.utterance;
        const text = this.kakaoService.kakaoRes(method, user_id, user_input);
        return res.json({
            version: '2.0',
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: text,
                        },
                    },
                ],
            },
        });
    }
};
exports.KakaoController = KakaoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], KakaoController.prototype, "Chatbot", null);
exports.KakaoController = KakaoController = __decorate([
    (0, common_1.Controller)('kakao'),
    __metadata("design:paramtypes", [kakao_service_1.KakaoService])
], KakaoController);
//# sourceMappingURL=kakao.controller.js.map