import { runTest as ScoreControllerTest } from "./unit/score-controller.test.js";
import { runTest as MoveControllerTest } from "./unit/move-controller.test.js";
import { runTest as ApplicationStoreTest } from './unit/application-store.test.js';
import { runTest as SubscriptionFactoryTest } from "./unit/subscription-factory.test.js";
import { runTest as WinConditionTest } from "./unit/win-conditions.test.js";

ScoreControllerTest();
MoveControllerTest();
ApplicationStoreTest();
SubscriptionFactoryTest();
WinConditionTest();